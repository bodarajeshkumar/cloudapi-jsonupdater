export class APIDetails {
    public apiName?: string;
    public title?: string;
    public description?:string;
    public codeSnippet?: CodeSnippet[];
}
export class CodeSnippet {
    public language?: string;
    public codeSnippet?: string;
}
