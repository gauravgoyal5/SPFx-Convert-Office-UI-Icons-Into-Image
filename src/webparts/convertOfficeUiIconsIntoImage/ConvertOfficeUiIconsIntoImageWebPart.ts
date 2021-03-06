import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './ConvertOfficeUiIconsIntoImageWebPart.module.scss';
import * as strings from 'ConvertOfficeUiIconsIntoImageWebPartStrings';

export interface IConvertOfficeUiIconsIntoImageWebPartProps {
  description: string;
}

require('./script');

export default class ConvertOfficeUiIconsIntoImageWebPart extends BaseClientSideWebPart<IConvertOfficeUiIconsIntoImageWebPartProps> {

  protected onInit(): Promise<void> {
    //SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css');
    //SPComponentLoader.loadCss('https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/10.0.0/css/fabric.min.css');
    return super.onInit();
  }

  public render(): void {
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css');
    this.domElement.innerHTML = `
      <div class="${ styles.convertOfficeUiIconsIntoImage }">
      <div class="ms-Grid" dir="ltr">
      <h1 class="ms-font-su">Render Office Fabric UI Icons into Canvas</h1>
      <p>This is a simple tool to render an icon from the <a class="ms-fontColor-blueLight" target='_blank' href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Office Fabric UI icon font</a> into an HTML <code>&lt;canvas&gt;</code> with a background color. Right-click and save the image to use it.</p>
      <div class="ms-Grid-row">
        <div class="ms-Grid-col ms-sm12 ms-lg6">
          <h2 class="ms-font-xxl">Icon/Canvas Specifications</h2>
          <form id="form">
            <div class="ms-Grid">
              <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-md6">
                  <label for="font-class">Icon name</label>
                  <input type="text" name="fontClass" id="font-class" placeholder="e.g. ms-Icon ms-Icon-Warning" value="Contact">
                </div>
                <div class="ms-Grid-col ms-md6">
                  <label for="font-size">Font size (px)</label>
                  <input type="number" step="1" min="1" name="fontSize" id="font-size" placeholder="e.g. 60" value="56">
                </div>
              </div>
              <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-md6">
                  <label for="image-width">Image width (px)</label>
                  <input type="number" step="1" min="0" name="imageWidth" id="image-width" placeholder="e.g. 80" value="92">
                </div>
                <div class="ms-Grid-col ms-md6">
                  <label for="image-height">Image height (px)</label>
                  <input type="number" step="1" min="0" name="imageHeight" id="image-height" placeholder="e.g. 80" value="92">
                </div>
              </div>
              <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-md6">
                  <label for="left-offset">Left offset</label>
                  <input type="number" step="1" name="leftOffset" id="left-offset" placeholder="e.g. 40" value="46">
                </div>
                <div class="ms-Grid-col ms-md6">
                  <label for="top-offset">Top offset</label>
                  <input type="number" step="1" name="topOffset" id="top-offset" placeholder="e.g. 40" value="46">
                </div>
              </div>
              <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-md6">
                  <label for="bg-color">Background color</label>
                  <input type="text" name="bgColor" id="bg-color" placeholder="e.g. #777777" value=#777777>
                </div>
                <div class="ms-Grid-col ms-md6">
                  <label for="icon-color">Icon color</label>
                  <input type="text" name="iconColor" id="icon-color" placeholder="e.g. #FFFFFF" value=#FFFFFF>
                </div>
              </div>
              <div class="ms-Grid-row">
                <div class="ms-Grid-col ms-sm12">
                  <label><input type="checkbox" checked name="shape" id="shape"> Use a circle as the background fill</label>
                </div>
              </div>
            </div>
    
            <input type="submit" class="ms-button ms-bgColor-themeDark ms-bgColor-themeDarker--hover ms-fontColor-white" value="Render Font Icon">
            
            <p>If the icon does not render immediately, wait a few seconds and press the <b>Render</b> button again; the webfont may still be loading.</p>
            
          </form>
        </div>
        <div class="ms-Grid-col ms-sm12 ms-lg6">
          <h2 class="ms-font-xxl">Result</h2>
          
          <div class="canvas-container">
            <canvas id="canvas" width="92" height="92"></canvas>
          </div>
          
          <p><a id="download-link" class="ms-button ms-bgColor-themeDark ms-bgColor-themeDarker--hover ms-fontColor-white" target="_blank"><i class="ms-Icon ms-Icon--Download"></i> Download the image</a></p>
          <label for="dataURL">Data URL</label>
          <input id="dataURL" type="text">
        </div>
      </div>
    </div>
      </div>`;
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
