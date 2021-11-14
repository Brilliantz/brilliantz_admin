<template>
  <div class="example">
    <quill-editor
      className="editor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange"
    />
  </div>
</template>

<script>
//import dedent from 'dedent-js'
// import { ImageResize } from 'quill-image-resize-module';
// import Quill from 'quill'
// Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'quill-editor-custom',
  data() {
    return {
      name: 'register-modules-example',
      content: `
          <p>Fleeting word</p>
        `,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['code-block']
            ],
            // handlers: {
            //   'image': function () {
            //     console.log('okok')
            //   }
            // }
          }
        }
      }
    }
  },
  methods: {
    onEditorChange(val) {
      this.$emit('syncTextSoal', val)
    }
  }
}
</script>

<style lang="scss" scoped>
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
