import json 
with open ('./answers2.json', 'r') as f:
    stuff = json.loads(f.read())
inputTokens = {}
for astring in stuff.keys():
    tok = astring.split(',')[0]
    if tok not in inputTokens:
        inputTokens[tok] = 0
    inputTokens[tok] = inputTokens[tok] + 1 
print(inputTokens)