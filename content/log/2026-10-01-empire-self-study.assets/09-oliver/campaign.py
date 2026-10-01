#!/usr/bin/env python3
"""Bounded differential campaign. PYTHONPATH must point at pinned python-textile.
Usage: python campaign.py OLIVER_BINARY OUTPUT_DIRECTORY
No project source is edited. Only OUTPUT_DIRECTORY receives artifacts.
"""
import json,sys,random,subprocess,pathlib,re,hashlib,uuid
from html.parser import HTMLParser
from fractions import Fraction
import textile,cooklang
# Stabilize only the reference's random document-local footnote prefix.
textile.core.uuid.uuid4=lambda:uuid.UUID(int=0)
SEED=9001
rng=random.Random(SEED)
exe=sys.argv[1]; out=pathlib.Path(sys.argv[2]); out.mkdir(parents=True,exist_ok=True)
def oliver(s,*args):
 p=subprocess.run([exe,*args],input=s.encode(),capture_output=True,timeout=5)
 if p.returncode: raise RuntimeError(f'exit {p.returncode}: {p.stderr.decode(errors="replace")}')
 return p.stdout.decode()
class Events(HTMLParser):
 def __init__(self,s):
  super().__init__(convert_charrefs=True); self.events=[]; self.stack=[]; self.feed(s)
 def handle_starttag(self,t,a):
  aa=[]
  for k,v in a:
   if k=='id' and v and v.startswith('fnrev'):continue
   if v:v=re.sub(r'fn[0-9a-f]{32}-(\d+)',r'fn\1',v)
   if k=='style' and v: v=';'.join(sorted(x.strip().replace(': ',':') for x in v.split(';') if x.strip()))
   aa.append((k,v))
  self.events.append(['start',t,sorted(aa)])
  if t not in ('img','br','hr','input'):self.stack.append(t)
 def handle_startendtag(self,t,a):self.handle_starttag(t,a)
 def handle_endtag(self,t):
  self.events.append(['end',t]);
  if self.stack and self.stack[-1]==t:self.stack.pop()
 def handle_data(self,s):
  if not s.strip() and (not self.stack or self.stack[-1] in ('ul','ol','table','tr','blockquote','dl')):return
  if self.events and self.events[-1][0]=='text':self.events[-1][1]+=s
  else:self.events.append(['text',s])
def tx(s):
 a=oliver(s,'render','--from','textile','--to','html'); b=textile.textile(s,html_type='html5')
 return a,b,Events(a).events,Events(b).events
def amount(q):
 if q is None or not str(q).strip():return None
 if isinstance(q,(int,float)):return float(q)
 q=q.strip().removeprefix('=')
 try:
  if re.fullmatch(r'\d+\s+\d+/\d+',q): w,f=q.split(); return float(int(w)+Fraction(f))
  return float(Fraction(q))
 except (ValueError,ZeroDivisionError): return q
def merged(items):
 result=[]
 for p in items:
  if p[0]=='text' and result and result[-1][0]=='text':result[-1][1]+=p[1]
  else:result.append(p)
 return result
def ours(j):
 result=[]
 for b in j['blocks']:
  if b['kind']=='section': result.append(['section',b['name']]);continue
  if b['kind']=='note':result.append(['note',b['text']]);continue
  items=[]
  for p in b['parts']:
   k=p['kind']
   if k=='text':items.append(['text',p['text']])
   elif k=='line_break':items.append(['text','\n'])
   else:items.append([k,p['name'],amount(p['quantity']),(p.get('units') or '').strip(),p.get('preparation')])
  result.append(['step',merged(items)])
 return result
def reference(recipe):
 result=[]
 for sec in recipe.sections:
  if sec.name is not None:result.append(['section',sec.name])
  for b in sec.blocks:
   if isinstance(b,cooklang.Note):result.append(['note',b.text]);continue
   items=[]
   for p in b.items:
    if isinstance(p,cooklang.TextItem):items.append(['text',p.value]);continue
    if isinstance(p,cooklang.IngredientRef):k='ingredient'; c=p.ingredient; prep=c.note
    elif isinstance(p,cooklang.CookwareRef):k='cookware';c=p.cookware;prep=None
    else:k='timer';c=p.timer;prep=None
    items.append([k,c.name or '',amount(c.quantity.value if c.quantity else None),(c.quantity.unit or '') if c.quantity else '',prep])
   result.append(['step',merged(items)])
 return result
def ck(s):
 a=ours(json.loads(oliver(s,'serialize','--from','cooklang','--json')))
 try:b=reference(cooklang.parse(s))
 except cooklang.CooklangError as e:b={'reference_error':str(e)}
 return a,b,a,b
text_seeds=['x','*x*','_x_','**x**','__x__','-x-','+x+','^x^','~x~','%x%','??x??','@x@','*_x_*','*{color:red}x*','%(note)x%','h2. x','p>. x','bq. x','bc. <x>','pre. <x>','"x":https://example.com','"x (title)":https://example.com','!x.png!','!x.png(alt)!','* a\n* b','* a\n** b','|a|b|','|_. a|b|','@a & b@','==*x*==','x[1]\n\nfn1. y','ABC(title)','2 x 2','a -- b','"hello"',"it's",'notextile. <b>x</b>','|{color:red}|. x','++x++','--x--','c[*oo*]l','<b>x</b>','p. x\nh2. y','| a | b |']
cook_seeds=['x','@salt','@salt{}','@salt{1%g}','#pan{}','~{5%min}','@salt and @pepper{2}','@ground black pepper{}','@x{1/2%cup}','@x{1 1/2%cup}','@x{two%pinches}','@x{ 2 % g }','@x{}(chopped)','-- comment','x [- comment -] y','x\ny','= A\n\n@x{}','> note','@salt, black pepper{}','@foo-bar{}','@./sauce{}','@x{=1%g}','@x{1-2%g}','@🧂','x\\\ny','x [- a\n\nb -] y','@a.b{}','@x{2} #y{3}','@x{01%g}','@x{1/0%g}']
def corpus(seeds,kind):
 cases=list(seeds)
 while len(cases)<400:
  s=rng.choice(seeds)
  if kind=='textile':
   mode=rng.randrange(5)
   if mode==0:s=rng.choice(['(', '[','a ','é ','{'])+s+rng.choice([')',']','!',' b','}'])
   elif mode==1:s+='\n\n'+rng.choice(seeds)
   elif mode==2:s=rng.choice(['h1. ','p. ','bq. ','|','* '])+s
   elif mode==3:s=rng.choice(['*','_','@','=='])+s+rng.choice(['*','_','@','=='])
   else:
    pos=rng.randrange(len(s)+1);s=s[:pos]+rng.choice([' ','\n','*','_','!','@','.',':'])+s[pos:]
  else:
   mode=rng.randrange(5)
   if mode==0:s='Add '+s+' now.'
   elif mode==1:s+='\n\n'+rng.choice(cook_seeds)
   elif mode==2:s=s.replace('salt',rng.choice(['black pepper','foo-bar','a.b','a,b','a:b','a/b','🧂']))
   elif mode==3:s=rng.choice(['= A\n\n','> ','x [- '])+s+rng.choice(['',' -] y'])
   else:
    pos=rng.randrange(len(s)+1);s=s[:pos]+rng.choice([' ','\n','@','#','~','{','}','%','--'])+s[pos:]
  cases.append(s)
 return cases
all_cases=[];results=[];summary={}
for kind,seeds,fn in [('textile',text_seeds,tx),('cooklang',cook_seeds,ck)]:
 counts={'cases':0,'raw_equal':0,'normalized_equal':0,'divergent':0,'reference_rejected':0,'execution_error':0}
 for i,s in enumerate(corpus(seeds,kind)):
  case={'dialect':kind,'index':i,'input':s};all_cases.append(case)
  try:
   a,b,na,nb=fn(s)
   status='normalized_equal' if na==nb else 'reference_rejected' if isinstance(nb,dict) and 'reference_error' in nb else 'divergent'
   counts[status]+=1; counts['raw_equal']+=a==b
   results.append(dict(case,status=status,oliver=a,reference=b,normalized_oliver=na,normalized_reference=nb))
  except Exception as e: counts['execution_error']+=1;results.append(dict(case,status='execution_error',error=str(e)))
  counts['cases']+=1
 summary[kind]=counts
summary.update(seed=SEED,python=sys.version.split()[0],textile_version=textile.__version__,cooklang_bindings=cooklang.__version__,cooklang_rs=cooklang.UPSTREAM_VERSION)
for name,rows in [('corpus.jsonl',all_cases),('results.jsonl',results)]:
 (out/name).write_text(''.join(json.dumps(r,ensure_ascii=False,separators=(',',':'))+'\n' for r in rows))
summary['corpus_sha256']=hashlib.sha256((out/'corpus.jsonl').read_bytes()).hexdigest()
(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary,indent=2))
