import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';
import './App.css';


const app = new Clarifai.App({
  apiKey: '706be7d3f9d44ee599115593484d3e17'
}); 

// const returnClarifaiRequestOptions = (imageURL) => {
//   const PAT = '7f98e911d9a741099d471275cb9929bb';
//   const USER_ID = 'cloudy524';       
//   const APP_ID = 'FaceRecognitionProject';
//   const MODEL_ID = 'face-recognition';   
//   const IMAGE_URL = imageURL;

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
// });

// const requestOptions = {
//   method: 'POST',
//   headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//   },
//   body: raw
// };

// return requestOptions;
// }

// app.models.predict('face-detection', this.state.input)
//       .then(response => {
//         console.log('hi', response)
//         if (response) {
//           fetch('http://localhost:3000/image', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               id: this.state.user.id
//             })
//           })
//             .then(response => response.json())
//             .then(count => {
//               this.setState(Object.assign(this.state.user, { entries: count}))
//             })

//         }
//         this.displayFaceBox(this.calculateFaceLocation(response))
//       })
//       .catch(err => console.log(err));


        
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaFace.left_col * width,
      topRow: clarifaFace.top_ro2 * height,
      rightCol: width - (clarifaFace.rightCol * width),
      bottomRow: height - (clarifaFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <>
          <ParticlesBg color="#777696" num={50} type="cobweb" bg={true} />
        </>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
      </div>
    );
  }
}

export default App;