import { fetchGzFile } from "./utils/file-utils.js";


async function doStuff() {
    let data = await fetchGzFile('https://static.treepadcloud.com/images/svg/icons.json.gz');
    const decoder = new TextDecoder();
    data = decoder.decode(data);
    console.log(data);
}

doStuff();