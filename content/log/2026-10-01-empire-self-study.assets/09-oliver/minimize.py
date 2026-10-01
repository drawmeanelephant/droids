#!/usr/bin/env python3
"""1-minimize selected mismatches; check Cooklang serializer fixed points.
Usage matches campaign.py; load helpers without executing its campaign loop.
"""
import pathlib,sys,json
ns={'__name__':'helpers'}
exec(pathlib.Path(__file__).with_name('campaign.py').read_text().split('all_cases=[];results=[];summary={}')[0],ns)
out=pathlib.Path(sys.argv[2]); count=0
def fail(s,kind):
 global count
 count+=1
 try:
  _,_,a,b=ns[kind](s)
  return a!=b and (kind=='fixedpoint' or not isinstance(b,dict))
 except Exception:return False
def minimize(s,kind,required=lambda s:True):
 # Deterministic character-deletion pass repeated to a fixed point.
 changed=True
 while changed:
  changed=False
  for i in range(len(s)):
   t=s[:i]+s[i+1:]
   if required(t) and fail(t,kind):s=t;changed=True;break
 return s
selected=[('block-comment-crosses-blank-line','ck','x [- a\n\nb -] y',lambda s:'[-' in s and '-]' in s and '\n\n' in s),('note-comment','ck','> -- comment',lambda s:s.startswith('>') and '--' in s),('punctuated-braced-name','ck','@salt, black pepper{}',lambda s:s.startswith('@') and len(s)>1 and s[1].isalpha() and ',' in s and '{}' in s),('space-before-braces','ck','@salt {1%g}',lambda s:'@' in s and ' {' in s and '}' in s),('textile-code-terminal-newline','tx','bc. <x>',lambda s:s.startswith('bc. ') and len(s)>4),('textile-bracket-forcing','tx','c[*oo*]l',lambda s:'[' in s and ']' in s and s.startswith('c') and s.endswith('l'))]
rows=[]
for name,kind,s,req in selected:
 m=minimize(s,kind,req);a,b,na,nb=ns[kind](m)
 rows.append(dict(name=name,original=s,input=m,oliver=a,reference=b,normalized_oliver=na,normalized_reference=nb))
(out/'minimized.json').write_text(json.dumps({'method':'Repeated left-to-right single-character deletion, preserving family predicate; 1-minimal under that predicate, not globally shortest','comparisons':count,'cases':rows},ensure_ascii=False,indent=2)+'\n')
def strip_spans(x):
 if isinstance(x,list):return [strip_spans(v) for v in x]
 if isinstance(x,dict):return {k:strip_spans(v) for k,v in x.items() if k!='span' and not k.endswith('_span')}
 return x
checks=[]
for line in (out/'corpus.jsonl').read_text().splitlines():
 r=json.loads(line)
 if r['dialect']!='cooklang':continue
 s=r['input'];serial=ns['oliver'](s,'serialize','--from','cooklang')
 a=strip_spans(json.loads(ns['oliver'](s,'serialize','--from','cooklang','--json')))
 b=strip_spans(json.loads(ns['oliver'](serial,'serialize','--from','cooklang','--json')))
 serial2=ns['oliver'](serial,'serialize','--from','cooklang')
 checks.append(dict(index=r['index'],input=s,serialized=serial,semantic_equal=a==b,idempotent=serial==serial2,original=a,reparsed=b))
(out/'roundtrip-results.jsonl').write_text(''.join(json.dumps(r,ensure_ascii=False,separators=(',',':'))+'\n' for r in checks))
def fixedpoint(s):
 serial=ns['oliver'](s,'serialize','--from','cooklang')
 a=strip_spans(json.loads(ns['oliver'](s,'serialize','--from','cooklang','--json')))
 b=strip_spans(json.loads(ns['oliver'](serial,'serialize','--from','cooklang','--json')))
 return a,b,a,b
ns['fixedpoint']=fixedpoint
m=minimize('@x{01\n%g}','fixedpoint')
a,b,_,_=fixedpoint(m)
serial=ns['oliver'](m,'serialize','--from','cooklang')
(out/'minimized-roundtrip.json').write_text(json.dumps(dict(input=m,serialized=serial,serialized_twice=ns['oliver'](serial,'serialize','--from','cooklang'),original=a,reparsed=b,total_minimization_comparisons=count),indent=2)+'\n')
print(json.dumps({'minimization_comparisons':count,'roundtrip_cases':len(checks),'semantic_failures':sum(not r['semantic_equal'] for r in checks),'idempotence_failures':sum(not r['idempotent'] for r in checks)},indent=2))
