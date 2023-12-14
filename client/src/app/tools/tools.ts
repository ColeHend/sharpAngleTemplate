
/**
 * Inserts an item into an array every nth position.
 * @param arr - The array to insert items into.
 * @param itemToInsert - The item to insert into the array.
 * @param n - The nth position to insert the item.
 * @returns A new array with the item inserted every nth position.
 */
export function insertItemEveryNth(arr:any[], itemToInsert:any, n:number) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        if ((i + 1) % n === 0) {
            result.push(itemToInsert);
        }
    }
    return result;
}