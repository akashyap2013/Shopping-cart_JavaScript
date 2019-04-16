// create element
const newElement = (tagname, cname, appendTo, fn) => {
    let tag = document.createElement(tagname);
    if (cname)
        tag.className += cname;
    if (appendTo)
        appendTo.appendChild(tag);
    if (fn)
        fn(tag);
}


export default newElement;