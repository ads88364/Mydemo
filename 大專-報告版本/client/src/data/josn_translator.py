import json

filename = "CityCountyData.json"
with open(filename) as f:
    temp_dict = json.load(f)
with open(filename, "w", encoding="utf-8") as f:
    temp_json = json.dumps(temp_dict, indent=4, ensure_ascii=False)
    f.write(temp_json)
