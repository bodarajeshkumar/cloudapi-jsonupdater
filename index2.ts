const OpenAPISnippet = require('openapi-snippet')
import { IBMCloudService } from './service/ibmCloudService';
let ibmCloudService = IBMCloudService.getInstance();
// define input:
main();
async function main()
{
    const openApi = await ibmCloudService.getNewVPCAPIList();// Open API document
    const targets = ['python_requests'] // array of targets for code snippets. See list below...

    try {
    // either, get snippets for ALL endpoints:
    //const results = OpenAPISnippet.getSnippets(openApi, targets) // results is now array of snippets, see "Output" below.
    //console.log(JSON.stringify(results));
    // ...or, get snippets for a single endpoint:
    const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/vpcs', 'get', targets)
    console.log(JSON.stringify(results2));
    console.log('\n');
    console.log(results2.snippets[0].content);
    } catch (err) {
    // do something with potential errors...
    }
}