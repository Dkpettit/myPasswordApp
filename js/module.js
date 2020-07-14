const accountdb = (dbname, table) => {
    // Create database
    const db = new Dexie(dbname)
    db.version(1).stores(table);
    db.open();
return db;
}

//insert function
const bulkcreate = (dbtable, data) => {

    let flag = empty(data);
    if(flag){
        dbtable.bulkAdd([data]);
        console.log("Data inserted successfully...");
    }else{
        console.log("Please provide data...")
    }
    return flag;
}

//check textbox validation
const empty = object => {
    let flag = false;

    for (const value in object){
        if(object[value] != "" && object.hasOwnProperty(value)){
            flag = true;
        }else{
            flag=false;
        }
    }
    return flag;
}

//Get data from database
const getData = (dbtable, fn) => {
    let index = 0;
    let obj = {};

    dbtable.count((count) =>{
        if(count){
            dbtable.each(table=>{
                obj = Sortobj(table);                
                fn(obj, index++);
            })
        }
        else
        {
            fn(0);
        }
    })
}

//sort the data
const Sortobj = sortobj => {
    let obj = {};

    obj = {
        id: sortobj.id,
        name: sortobj.name,
        loginId: sortobj.loginId,
        password: sortobj.password
    }
    return obj;
}

//create dynamic element
const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if(appendTo){
        appendTo.appendChild(element);        
    }
    if(fn){
       fn(element); 
    }
}

export default accountdb;
export{
    bulkcreate,
    getData,
    createEle
}