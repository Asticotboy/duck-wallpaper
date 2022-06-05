// eslint-disable-next-line
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const htmlToImage = require('html-to-image');
const downloadFunc = require("downloadjs");



class App extends React.Component{

  heightInput = React.createRef();
  widthInput = React.createRef();
  backgroundColorInput = React.createRef();
  degradeInput = React.createRef();
  angleInput = React.createRef();
  borderSizeInput = React.createRef();
  borderColorInput = React.createRef();
  borderTypeInput = React.createRef();
  borderRadiusInput = React.createRef();
  numberColorInput = React.createRef();

  defaultWidth = 800;
  defaultHeight = 450;


  form1Elem = React.createRef();
  form2Elem = React.createRef();

  form1 = false;
  form2 = false;

  state = {
    title:"Duck : Wallpaper Creator",
    width:1920,
    height:1080,
    degrade:true,
    angle:45,
    numberColor:2,
    borderSize:2,
    borderColor:"#000000",
    borderType:"solid",
    borderRadius:0,
    backgroundColor:"#00ffff",
    color:["#ff0000"],
    colorsString:"#ff0000",
    exampleStyle:{
      border: "black solid 2px",
      width:`800px`,
      height:"450px",
      backgroundColor: "#00ffff",
      background: "linear-gradient(45deg, #00ffff,#ff0000)"
    }
  }

   handleChangeWidth = () =>{
    let widthValue = this.widthInput.current.value;
    // let copy = {...this.state.exampleStyle};
    // copy["width"] = widthValue.toString() + "px";
    // this.setState({exampleStyle: copy });

    this.setState({width:widthValue});
  }

  handleChangeHeight = () =>{
    let heightValue = this.heightInput.current.value;
    // let copy = {...this.state.exampleStyle};
    // copy["height"] = heightValue.toString() + "px";
    // this.setState({exampleStyle: copy });

    this.setState({height:heightValue});
  }

  handleChangeBackgroundColor = () =>{
    let backgroundColorValue = this.backgroundColorInput.current.value;
    let copy = {...this.state.exampleStyle};
    if(this.state.degrade === true){
      copy["background"] = `linear-gradient(${this.state.angle.toString() + "deg"}, ${backgroundColorValue},  ${this.state.colorsString})`;
    }
    else{
      copy["backgroundColor"] = backgroundColorValue.toString();
    }    
    this.setState({backgroundColor:backgroundColorValue.toString()});
    this.setState({exampleStyle: copy });  
  }


  

  handleChangeDegrade = () =>{
    let degradeValue = this.degradeInput.current.checked;
    let copy = {...this.state.exampleStyle};
    if(degradeValue === true){
      copy["background"] = `linear-gradient(${this.state.angle.toString() + "deg"}, ${this.state.backgroundColor},${this.state.colorsString})`;
    }
    else{
      copy["background"] = `${this.state.backgroundColor}`;
    }
    this.setState({exampleStyle: copy });  
    this.setState({degrade:degradeValue});
  }

  handleChangeAngle = () =>{
    let angleValue = this.angleInput.current.value;
    let copy = {...this.state.exampleStyle};

    if(this.state.degrade === true){
      copy["background"] = `linear-gradient(${angleValue.toString()+"deg"}, ${this.state.backgroundColor}, ${this.state.colorsString})`;
    }
    else{
      copy["background"] = `${this.state.backgroundColor}`;
    }
    this.setState({exampleStyle: copy });  
    this.setState({angle:angleValue});
  }

  handleChangeBorderSize = () =>{
    let borderSizeValue = this.borderSizeInput.current.value;
    let copy = {...this.state.exampleStyle};
    copy["border"] = `${this.state.borderColor} ${this.state.borderType} ${borderSizeValue}px`;
    this.setState({exampleStyle: copy });  
    this.setState({borderSize:borderSizeValue});
  }

  handleChangeBorderColor = () => {
    let borderColorValue = this.borderColorInput.current.value;
    let copy = {...this.state.exampleStyle};
    copy["border"] = `${borderColorValue} ${this.state.borderType} ${this.state.borderSize}px`;
    this.setState({exampleStyle: copy });  
    this.setState({borderColor:borderColorValue.toString()});
  }

  handleChangeBorderType = () => {
    let borderTypeValue = this.borderTypeInput.current.value;
    let copy = {...this.state.exampleStyle};
    copy["border"] = `${this.state.borderColor} ${borderTypeValue} ${this.state.borderSize}px`;
    this.setState({exampleStyle: copy });  
    this.setState({borderType:borderTypeValue.toString()});
  }

  handleChangeBorderRadius = () => {
    let borderRadiusValue = this.borderRadiusInput.current.value;
    let copy = {...this.state.exampleStyle};
    copy["borderRadius"] = `${borderRadiusValue +"px"}`
    this.setState({exampleStyle: copy });  
    this.setState({borderRadius:borderRadiusValue.toString()});
  }

  convertToPng = ()=>{
    // var node = document.getElementById('wallpaper');
    //   htmlToImage.toPng(node)
    // .then(function (dataUrl) {
    //   var img = new Image();
    //   img.src = dataUrl;
    //   document.body.appendChild(img);
    // })
    // .catch(function (error) {
    //   console.error('oops', error);
    // });

    let copy = {...this.state.exampleStyle};
    copy["height"] = this.state.height.toString() + "px";
    copy["width"] = this.state.width.toString() + "px";
    this.setState({exampleStyle: copy })
    setTimeout(()=>{  
          
          const filter = {width:this.state.width, height:this.state.height};

        htmlToImage.toPng(document.getElementById('wallpaper'), {filter:filter})
      .then(function (dataUrl) {
        downloadFunc(dataUrl, 'myWallpaper.png');})
      .finally(()=>{
          let copy2 = {...this.state.exampleStyle};
          copy2["height"] = this.defaultHeight.toString() + "px";
          copy2["width"] = this.defaultWidth.toString() + "px";
          this.setState({exampleStyle: copy2 });
        });
      
  
  },500);
}

handleChangeNumberColor = ()=>{
  let numberColor = this.numberColorInput.current.value;
  if(numberColor === "" || numberColor ==="0"){
    return false;
  }
  else{
    this.setState({numberColor});
  }
}


handleChangeBackgroundGradendeColor (elem) {
  let color = [...this.state.color];
  color[elem.id] = elem.value.toString();
  this.setState({color});

  let list = "";
    this.state.color.map((color)=>{
      list+=color+",";
    })
  this.setState({colorsString:list.substring(0, list.length - 1)});


  let copy = {...this.state.exampleStyle};

  if(this.state.degrade === true){
    copy["background"] = `linear-gradient(${this.state.angle.toString()+"deg"}, ${this.state.backgroundColor}, ${this.state.colorsString})`;
  }
  else{
    copy["background"] = `${this.state.backgroundColor}`;
  }
  this.setState({exampleStyle: copy });  
}

showForm1 = ()=>{
  if(this.form1 === false){
    this.form1Elem.current.style.display = "block";
    this.form1 = true;
  }
  else{
    this.form1Elem.current.style.display = "none";
    this.form1 = false;
  }
}
showForm2 = ()=>{
  if(this.form2 === false){
    this.form2Elem.current.style.display = "block";
    this.form2 = true;
  }
  else{
    this.form2Elem.current.style.display = "none";
    this.form2 = false;
  }
}



  render(){

    return(
      <div>
        <div id="logo"></div>
        <h1>{this.state.title}</h1>

        <div id="menu">
        <h2 onClick={this.showForm1}>Fond</h2>
        <hr></hr>
        <form ref={this.form1Elem}>
        <label>Largeur </label>
        <input onChange={this.handleChangeWidth} ref={this.widthInput} type="number" value={this.state.width}></input>
        <br></br>
        <label>Hauteur </label>
        <input  onChange={this.handleChangeHeight} ref={this.heightInput} type="number" value={this.state.height}></input>
        <br></br>
        <br></br>

        <label>Nombre de couleurs (Dégradé)</label><br></br>
        <input onChange={this.handleChangeNumberColor} ref={this.numberColorInput} type="number" min={2} value={this.state.numberColor}></input>

        <br></br>
        <label>Couleur Fond </label><br></br>
        <input  onChange={this.handleChangeBackgroundColor} ref={this.backgroundColorInput} type="color" value={this.state.backgroundColor}></input>

        <br></br>
         
        <label>Couleur Fond (Dégradé)</label><br></br>
        {Array.from(Array(this.state.numberColor-1), (e,i)=>{
          return <div><input id={i} type="color" value={this.state.color[i]} onChange={e => this.handleChangeBackgroundGradendeColor(e.target)}></input><br></br></div>
        })}
        <br></br>

        <label>Dégradé</label><br></br>
        <input onChange={this.handleChangeDegrade} ref={this.degradeInput} checked={this.state.degrade} type="checkbox"></input>
        <br></br>

        <label>Angle du Dégradé</label><br></br>
        <input onChange={this.handleChangeAngle} ref={this.angleInput} type="range" min={0} max={360} value={this.state.angle} ></input>
        <br></br>
        <hr></hr>
        </form>
        <h2 onClick={this.showForm2}>Bords</h2>
        <hr></hr>
        <form ref={this.form2Elem}>
          <label>Taille </label><br></br>
          <input onChange={this.handleChangeBorderSize} ref={this.borderSizeInput} min={0} type="number" value={this.state.borderSize} ></input>
          <br></br>

          <label>Arrondi des bords </label><br></br>
          <input onChange={this.handleChangeBorderRadius} ref={this.borderRadiusInput} min={0} type="number" value={this.state.borderRadius} ></input>
          <br></br>


          <label>Couleur</label><br></br>
          <input  onChange={this.handleChangeBorderColor} ref={this.borderColorInput} type="color" value={this.state.borderColor}></input>
          <br></br>

          <label>Type </label><br></br>
          <select onChange={this.handleChangeBorderType} ref={this.borderTypeInput} value={this.state.borderType}>
            <option value="none">rien</option>
            <option value="solid">continue</option>
            <option value="dotted">points</option>
            <option value="inset">encart</option>
            <option value="double">double</option>
            <option value="groove">relief</option>
          </select>

        </form>
        
        
        
        <br></br>
        </div>
        {/*  div menu */}
        <input id="downloadBtn" onClick={this.convertToPng} type="button" value={"Télécharger mon fond d'écran !"}></input>
        <br></br>
        <br></br>
        <div id="container">
        <div style={this.state.exampleStyle} id="wallpaper"></div>
        </div>
        

      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);