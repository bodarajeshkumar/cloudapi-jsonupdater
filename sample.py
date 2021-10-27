import requests

url = "https://us-south.iaas.cloud.ibm.com/v1/vpcs"

querystring = {"version":"SOME_STRING_VALUE","generation":"SOME_INTEGER_VALUE","start":"SOME_STRING_VALUE","limit":"SOME_INTEGER_VALUE","resource_group.id":"SOME_STRING_VALUE","classic_access":"true"}

headers = {"Authorization": "Bearer REPLACE_BEARER_TOKEN"}

response = requests.request("GET", url, headers=headers, params=querystring)