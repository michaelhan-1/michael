declare interface IMyModalPopupWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TestFieldLabel:string;
}

declare module 'MyModalPopupWebPartStrings' {
  const strings: IMyModalPopupWebPartStrings;
  export = strings;
}
