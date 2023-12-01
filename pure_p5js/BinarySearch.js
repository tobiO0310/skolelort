/** Binary Search O(log n) */
export default function binarySearch(arr, val) {
    // Hvis array har mindre end 2 elementer (altså 1 eller 0), må det første element være værdien ellers findes den ikke. 
    if (arr.length < 2) {
        if (arr[0] == val) {
            return 0;
        }
        return -1;
    }
    // Hvis arrayet har en længde på 2 eller mere, skal vi finde midt punktet
    const mid = Math.floor(arr.length / 2);
    // Så skal vi se om værdien er større eller mindre end midt punktet
    if (val > arr[mid]) {
        // Hvis større, del op og lav rekursion.
        const i = binarySearch(arr.slice(mid), val);
        // Sørg for at tilføje midtens indeks, med mindre man ikke kunne finde værdien
        if (i != -1) {
            return mid + i;
        }
        return i;
    } else if (val < arr[mid]) {
        // Hvis mindre, split fra start til midte og lav rekursion.
        const i = binarySearch(arr.slice(0, mid), val);
        return i;
    } else if (val == arr[mid]) {
        // Hvis lig med, retunere midtens indeks
        return mid;
    }
    // Sikkerhed: Hvis den er hverken mindre, større eller lig med.
    // Retunere -1 for sikkerhedsskyld, hvis man fx har en array af tal og en værdi som er en string.
    return -1;
}
