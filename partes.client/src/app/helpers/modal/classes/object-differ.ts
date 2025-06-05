import { Directive, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

export class ObjectDiffer {

   private KeyObjectDiffers: KeyObjectDiffer[] = [];

   private Differs: KeyValueDiffers | null = null;


   static CreateDiffer(value: any, Differs: KeyValueDiffers): ObjectDiffer | null {

      let vObjectDiffer = new ObjectDiffer();

      vObjectDiffer.Differs = Differs;

      ObjectDiffer.CreateObjectDiffers(value, vObjectDiffer);
      if (vObjectDiffer.KeyObjectDiffers.length > 0) { return vObjectDiffer; }

      else { return null }

   }



   private static CreateObjectDiffers(value: any, objectDiffer: ObjectDiffer): void {
      try {
         if (value && typeof value === 'object') {
               if (!objectDiffer) { objectDiffer = new ObjectDiffer };

               let vDiffer: KeyObjectDiffer = new KeyObjectDiffer;

               vDiffer.Data = value;

               vDiffer.Differ = objectDiffer.Differs!.find(vDiffer.Data).create();
               vDiffer.Differ.diff(vDiffer.Data)

               objectDiffer.KeyObjectDiffers.push(vDiffer);

               for (const key of Object.keys(value)) { 
                  ObjectDiffer.CreateObjectDiffers(value[key], objectDiffer)

               }
         }
      } catch (error) {
         console.log(error)

      }



    }

    private RemoveDiffer(value: any) {

        let i = this.KeyObjectDiffers.findIndex((differ, index) => { return differ.Data === value })
        if (i > -1) {
            this.KeyObjectDiffers.splice(i, 1);
        }
    }
    public GetChanges(): boolean {

        for (let vDifer of this.KeyObjectDiffers) {
            let changes = vDifer.Differ!.diff(vDifer.Data);
            if (changes) {
                changes.forEachItem((change) => {
                    if (change.previousValue != change.currentValue) {
                        if (typeof change.previousValue === 'object' && change.previousValue) {
                            this.RemoveDiffer(change.previousValue)
                        }

                        if (typeof change.currentValue === 'object') {
                            ObjectDiffer.CreateObjectDiffers(change.currentValue, this);
                        }


                    }

                })

                return true
            }
        }

        return false;
    };

    public SaveChanges() {
        for (let vDifer of this.KeyObjectDiffers) {
            vDifer.Differ!.diff(vDifer.Data);
        }
    }

}


class KeyObjectDiffer {
    public Differ: KeyValueDiffer<string, any> | null = null;
    public Data: any;
}
