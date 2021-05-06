import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { sp } from "@pnp/sp";  
import "@pnp/sp/webs";  
import "@pnp/sp/lists";  
import "@pnp/sp/items";  
import { Title } from 'HelloWorldApplicationCustomizerStrings';

export default class CutomDialog extends BaseDialog{
    public render():void {

        this.domElement.innerHTML+=`
        <div>
            <table>
                <tbody>
                    <tr>
                        <td valign="top" width="113px">
                            <span>Title</span>
                        </td>

                        <td valign="top" width="350px">
                            <span>
                                <input type="text" maxlength="255" id="title">
                            </span>
                        </td>
                    </tr>
                    <tr>
                    <td valign="top" width="113px">
                        <span>test</span>
                    </td>

                    <td valign="top" width="350px">
                        <span>
                            <input type="text" maxlength="255" id="test">
                        </span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button id="save"> submit</button>
                    </td> 
                </tr>
                </tbody>
            </table>
        </div>                
        `;
        this.submit();
    }
    public  submit(){

        const webpart : CutomDialog=this;
        this.domElement.querySelector('#save').addEventListener("click",async function(e){
            const title=(<HTMLInputElement>document.getElementById('title')).value;
            const test=(<HTMLInputElement>document.getElementById('test')).value;
            console.log(title);
            console.log(test);
            await sp.web.lists.getByTitle("TestList").items.add({
                Title:title,
                test:test
            });
        })
    }

    protected onAfterClose(): void {  
        super.onAfterClose();       
      }  
    public getConfig():IDialogConfiguration{
        return {
            isBlocking: false
        };
    }
}
