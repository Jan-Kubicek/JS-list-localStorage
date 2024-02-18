const inp1 = document.querySelector("#input1");
const inp2 = document.querySelector("#input2");
const inp3Num = document.querySelector("#input3");
const btnAdd = document.querySelector("#btn-add");
const out = document.querySelector("#out");
const delAll = document.querySelector("#delete-rows");
const resetB = document.querySelector("#reset");
const boostB = document.querySelector("#boost");

function createObject(jmeno, typ, vek){
  let i = (localStorage.length)+1;
  if(vek < 18){
    vek = 18;
  }
  return {id: i,jmeno:jmeno, typ:typ,vek: vek, xp : 0};
}
function addIntoStorage(){
  vymazPool();
  let jmeno = inp1.value;
  let typ = inp2.value;
  let vek = inp3Num.value;
  if(jmeno == "" || typ == "" || vek == ""){
    alert("Nezadal jste všechny potřebné údaje!");
  }
  else{
    const obj = createObject(jmeno, typ, vek);
    const objString = JSON.stringify(obj);
    let id = new Date().getTime().toString();
    localStorage.setItem(id, objString);
    console.log(localStorage.length);
    reset();
  }
  resetINP();
}
function vypis(){
  if(localStorage.length > 0){
    vymazPool();
    for(let i = 0; i<localStorage.length; i++){
      // Element
      const element = document.createElement("div");
      const atributeEl = document.createAttribute("data-div");
      element.setAttributeNode(atributeEl);
      // Button
      const delRow = document.createElement("button");
      const atributeDR = document.createAttribute("data-btn");
      delRow.setAttributeNode(atributeDR);
      delRow.textContent="Delete ROW";
      //Input data from localStorage
      let key = localStorage.key(i);
      let item = localStorage.getItem(key);
      let vys = JSON.parse(item);
      let output = `Řádek:${i}  Typ:${vys.typ}  Jmeno:${vys.jmeno}  Vek:${vys.vek}  XP:${vys.xp}`;


      //combination
      delRow.addEventListener("click", function () {vymazRadek(key)})
      atributeEl.value=key;
      atributeDR.value=key;
      element.textContent=output;
      element.appendChild(delRow);
      out.appendChild(element);
    }

  }
}
function vymazPool(){
  do {
    let childs = out.childNodes;
    childs.forEach((item) => out.removeChild(item));
  }while(out.childNodes.length > 0)
}
function vymazStorage(){
  for(let i = 0; i < localStorage.length ; i++){
    vymazPool();
  }
  localStorage.clear();
}
function reset(){
  vymazPool();
  vypis();

}
function boost(){
  for(let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let item = localStorage.getItem(key);
    let objPrev = JSON.parse(item);
    localStorage.removeItem(key);
    objPrev.xp = objPrev.xp + 100;
    let objAft = JSON.stringify(objPrev);
    localStorage.setItem(key, objAft);
  }
  reset();
}
function vymazRadek(id){
  let childs = out.childNodes;
  childs.forEach((item) =>{
    let atribute = item.getAttribute("data-div");
    if(id === atribute){
      localStorage.removeItem(id);
    }
  })
  reset();
}

function resetINP(){
  inp1.value="";
  inp2.value="";
  inp3Num.value="";
}

btnAdd.addEventListener("click",addIntoStorage);
delAll.addEventListener("click",vymazStorage);
resetB.addEventListener("click",reset);
boostB.addEventListener("click",boost);
