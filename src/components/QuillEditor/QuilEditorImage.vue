<template>
  <div class="example">
    <quill-editor
      id="quill-image"
      className="editor"
      v-model="content"
      :options="editorOption"
    />
    <input type="file" id="getFile" @change="uploadImageToParent($event)" />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "QuilEditorImage",
  data: () => ({
    content: `

        `,
    editorOption: {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            ['image']
          ],
          handlers: {
            'image': function(){
              document.getElementById('getFile').click()
            }
          }
        }
      }
    },
  }),
  methods: {
    uploadImageToParent: _.throttle(function (e){
      this.content = e.target.files[0] != null
        ? e.target.files[0].name
        : 'Error mengupload gambar'
      this.$emit('syncImageSoal', e.target.files[0] != null
        ? e.target.files[0]
        : null)
      //you can get images data in e.target.files
      //an single example for using formData to post to server
      //do your post
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
#quill-image{
  .ql-container,.ql-snow{
    visibility: hidden;
  }
}

.example {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1rem;

  .editor {
    height: 40rem;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>
