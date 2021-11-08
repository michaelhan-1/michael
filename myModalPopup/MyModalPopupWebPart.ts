import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MyModalPopupWebPartStrings';
import MyModalPopup from './components/MyModalPopup';
import { IMyModalPopupProps } from './components/IMyModalPopupProps';

export interface IMyModalPopupWebPartProps {
  description: string;
  test:string;
}

export default class MyModalPopupWebPart extends BaseClientSideWebPart<IMyModalPopupWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMyModalPopupProps> = React.createElement(
      MyModalPopup,
      {
        description: this.properties.description,
        test: this.properties.test,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test', {
                  label: strings.TestFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
