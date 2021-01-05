import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }

  }
  checkMimeType = (e) => {
    //getting file object
    let files = e.target.files
    //define message container
    let err = []
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif']
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + ' is not a supported format\n';
      }
    };
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      e.target.value = null
    }
    return true;
  }
  maxSelectFile = (e) => {
    let files = e.target.files
    if (files.length > 1) {
      const msg = 'Only 1 images can be uploaded at a time'
      e.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }
  checkFileSize = (e) => {
    let files = e.target.files
    let size = 2000000
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    };
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      e.target.value = null
    }
    return true;
  }
  onChangeHandler = (e) => {
    console.log(e.target.files[0])
    var files = e.target.files[0]
    if (this.maxSelectFile(e) && this.checkMimeType(e) && this.checkFileSize(e)) {
      this.setState({
        selectedFile: files,
        loaded: 0
      })
    }
  }
  onClickHandler = () => {
    const data = new FormData()
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x])
    }
    axios.post("http://localhost:8000/upload", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },
    })
      .then(res => {
        console.log(res.statusText)
        toast.success('upload success')
      })
      .catch(err => {
        toast.error('upload fail')
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
            </div>
            <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
            </div>

            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>
        </div>
      </div>
    );
  }
}

export default App;

