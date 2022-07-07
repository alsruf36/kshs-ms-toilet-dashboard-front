import { defineStore } from "pinia";

interface Toilet {
  id: number;
  rotation: number;
  flush: number;
}

export type ToiletState = {
  toilets: Toilet[];
};
  
export const useToilet = defineStore("toilet", {
  state: () =>
    ({
      toilets: [],
    } as ToiletState),

  actions: {
    async fetchToilets() {
      try{
        await fetch("https://toilet.kshs.dev/api/toilets/list/")
          .then((response) => response.json())
          .then((data_list) => {
            console.debug(data_list)
            data_list['toilets'].forEach(async (toilet: number) => {
              try{
                await fetch(`https://toilet.kshs.dev/api/toilets/?id=${toilet}`)
                  .then((response) => response.json())
                  .then((data) => {
                    console.debug(data)
                    const index = this.findIndexById(toilet);
                    console.debug(index)

                    if (index === -1) {
                      this.createNewItem({
                        id: toilet,
                        rotation: data['rotation'],
                        flush: data['flush'],
                      });
                    }

                    else{
                      this.updateItem(toilet, {
                        id: toilet,
                        rotation: data['rotation'],
                        flush: data['flush'],
                      });
                    }
                  });
              }
              catch(e){
                console.log(e);
              }
            });
          });
      }
      catch(e){
        console.log(e);
      }
    },

    createNewItem(toilet: Toilet) {
      if (!toilet) return;

      this.toilets.push(toilet);
    },

    updateItem(id: number, payload: Toilet) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.toilets[index] = payload;
      }
    },

    deleteItem(id: number) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.toilets.splice(index, 1);
    },

    findIndexById(id: number) {
      return this.toilets.findIndex((toilet) => toilet.id === id);
    },
  },
});
