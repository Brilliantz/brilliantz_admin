<template>
  <div class="example">
    <div
      :class="imageUploadWrapClass"
      @dragover="onDragOverImage"
      @dragleave="onDragLeaveImage"
      v-show="isImageUpload">
      <input
        class="file-upload-input"
        type='file'
        @change="readURL"
      />
      <div class="drag-text">
        <h3>Drag and drop a file or select add Image</h3>
      </div>
    </div>
    <div v-if="isShowImage" class="file-upload-content">
      <img
        class="file-upload-image"
        :src="sourceImage"
        alt="your image" />
      <div class="image-title-wrap">
        <button
          type="button" @click="removeUpload"
          class="remove-image">Remove
          <span class="image-title">{{imageTitle ? imageTitle : 'Uploaded Image'}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "QuilEditorImage",
  data: () => ({
    isImageUpload: true,
    isShowImage: false,
    imageFile: null,
    sourceImage: '',
    imageTitle: null,
    imageUploadWrapClass: 'image-upload-wrap',
  }),
  watch: {
    imageFile(val){
      if(val){
        this.uploadImageToParent(val)
      }
    }
  },
  methods: {
    onSyncParentImage(imageUrl){
      if(imageUrl){
        const respond = new Promise((resolve) => {
          this.sourceImage = imageUrl
          if(this.sourceImage == imageUrl)
            resolve(true)
        })
        respond.then(() => {
          console.log('promise')
          this.isImageUpload = false
          this.isShowImage = true
          this.imageTitle = null
        })
        console.log(this.sourceImage)
      }
      else{
        this.removeUpload()
      }
    },
    onDragOverImage(){
      this.imageUploadWrapClass = 'image-upload-wrap image-dropping'
    },
    onDragLeaveImage(){
      this.imageUploadWrapClass = 'image-upload-wrap'
    },
    //Parsing data to preview image
    readURL(data){
      if (data.target.files && data.target.files[0]) {
        this.imageTitle = data.target.files[0].name
        let self = this
        this.imageFile = data.target.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
          self.isImageUpload = false
          self.isShowImage = true
          self.sourceImage = e.target.result;
        }
        reader.readAsDataURL(data.target.files[0]);
      } else {
        this.removeUpload();
      }
    },
    removeUpload(){
      this.isImageUpload = true
      this.isShowImage = false
      this.imageTitle = null
      this.sourceImage = null
      this.imageFile = null
    },
    uploadImageToParent: _.throttle(function (files){
      console.log('jalan')
      this.$emit('syncImageSoal', files != null
        ? files
        : null)
      //you can get images data in e.target.files
      //an single example for using formData to post to server
      //do your post
    }, 1000)
  }
}
</script>

<style scoped>
.file-upload {
  background-color: #ffffff;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.file-upload-content {
  text-align: center;
}

.file-upload-input {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
}

.image-upload-wrap {
  margin-top: 20px;
  border: 4px dashed #4a47d6;
  position: relative;
}

.image-dropping,
.image-upload-wrap:hover{
  background-color: #4a47d6;
  border: 4px dashed #ffffff;
}
.image-upload-wrap:hover .drag-text h3{
  color: white;
}

.image-title-wrap {
  padding: 0 15px 15px 15px;
  color: #222;
}

.drag-text {
  text-align: center;
}

.drag-text h3 {
  text-transform: uppercase;
  font-weight: bold;
  color: #4a47d6;
  padding: 60px 0;
}

.file-upload-image {
  max-height: 200px;
  max-width: 200px;
  margin: auto;
  padding: 20px;
}

.remove-image {
  width: 200px;
  margin: 0;
  color: #fff;
  background: #cd4535;
  border: none;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 4px solid #b02818;
  transition: all .2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
}

.remove-image:hover {
  background: #c13b2a;
  color: #ffffff;
  transition: all .2s ease;
  cursor: pointer;
}

.remove-image:active {
  border: 0;
  transition: all .2s ease;
}

.example {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>
