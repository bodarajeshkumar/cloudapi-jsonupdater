const vm = require('vm');
const fs = require("fs");
var git = require('nodegit');
import { IBMCloudService } from './service/ibmCloudService';
let ibmCloudService = IBMCloudService.getInstance();
var fileName = 'sample.json';
var tag = 'VPCs';
getVPCJson();

var url = "git@github.com:bodarajeshkumar/Developer-Playground.git",
local = "./playground-repo";
let cloneOpts:any = {};

var publickey1 = fs.readFileSync("/Users/rajeshkumarboda/.ssh/id_rsa.pub").toString();
var privatekey1 = fs.readFileSync("/Users/rajeshkumarboda/.ssh/id_rsa").toString();
var passphrase1 = "";
fs.rmdirSync("./playground-repo", { recursive: true });
var playgroundJson = ''
cloneOpts.fetchOpts = {
    callbacks: {
      credentials: function(url: string, userName:string) {
        return git.Cred.sshKeyMemoryNew("git", publickey1, privatekey1, passphrase1);
      }
    }
};

async function getVPCJson()
{
	let vpcJson = await ibmCloudService.getNewVPCAPIList();
  //const code = await ibmCloudService.getNewVPCAPIList();
  const code = await ibmCloudService.getDefaultAdapter();
  const context = { vpcJson: vpcJson, tag: tag,  finalJson: {} };
  vm.createContext(context);
  await vm.runInContext(code, context);
  console.log(context.finalJson);
  playgroundJson = JSON.stringify(context.finalJson, null, "  ")
  console.log(playgroundJson);
  await git.Clone(url, local, cloneOpts);
  await checkkin();
}

async function checkkin()
{
  const repo = await git.Repository.open('./playground-repo');
  const index = await repo.refreshIndex(); // read latest
  const files = await repo.getStatus(); // get status of all files
  fs.writeFileSync('./playground-repo/ibm-cloud/' + fileName, playgroundJson);
  await index.addByPath('ibm-cloud/' + fileName);
  files.forEach(file => index.addByPath(file.path())); // stage each file
  await index.write(); // flush changes to index
  const changes = await index.writeTree(); // get reference to a set of changes
  const head = await git.Reference.nameToId(repo, "HEAD"); // get reference to the current state
  const parent = await repo.getCommit(head); // get the commit for current state
  const author = git.Signature.now("author", "bodarajeshkumar"); 
  const committer = git.Signature.now("committer", "rajeshkumarboda@in.ibm.com");
  // combine all info into commit and return hash
  const commitId = await repo.createCommit("HEAD", author, committer, "message2", changes, [parent]);
  console.log('commitId', commitId);
  const remote = await repo.getRemote("origin");
  remote.push(["refs/heads/master:refs/heads/master"], {
    callbacks: {
        credentials: function (url, userName) {
            console.log("Requesting creds");
            return git.Cred.sshKeyMemoryNew("git", publickey1, privatekey1, passphrase1);
        }
    }
});
}
