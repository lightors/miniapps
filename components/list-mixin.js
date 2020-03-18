export default Behavior({
  data: {
    authorName:'$imba'
  },

  methods: {
    $emit(eventname,data) {
      this.triggerEvent(eventname,data)
    }
  }
})