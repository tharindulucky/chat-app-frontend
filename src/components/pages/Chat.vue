<template>
    <main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Chat! {{isConnected}}</div>
                      <div class="card-body">
                        <div class="row">
                          <Sidebar :sessions="sessions"></Sidebar>
                          <div class="col-md-9">

                                <div class="chat-wrapper" id="chat-wrapper-box" ref="chatWrapperBox">
                                    <ul class="chat-list">
                                        <li class="chat-list-item" v-for="message in sessionMessages" :key="message.id">
                                            <div class="box" :class="message.party == 'self' ? 'sb4' : 'sb3'">{{message.content}}</div>
                                        </li>
                                    </ul>
                                </div>

                                <br>
                             
                                <div class="form-group">
                                    <textarea v-model="message" v-on:keyup.enter="sendMessage" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Type your message here and hit enter..."></textarea>
                                </div>
                             
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped>
    .chat-wrapper{
        max-height: 600px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse
    }
    ::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }

.chat-list {
  list-style-type: none;
  padding-left: 0px;
}

.box {
  width: 300px;
  margin: 50px auto;
  background: #00bfb6;
  padding: 20px;
  text-align: center;
  position: relative;
  border-radius: 25px;
}

.sb3{
    margin-left: 0px;
    background:#ceeef3;
    color: #666666;
    text-align: left;
}

.sb4{
    margin-right: 0px;
    background:#0d9fc4;
    color: #ffffff;
    text-align: left;
}

.sb3:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid #ceeef3;
  border-right: 10px solid transparent;
  border-top: 10px solid #ceeef3;
  border-bottom: 10px solid transparent;
  left: 19px;
  bottom: -19px;
}

.sb4:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid #0d9fc4;
  border-top: 10px solid #0d9fc4;
  border-bottom: 10px solid transparent;
  right: 19px;
  bottom: -19px;
}


</style>

<script>

  import Sidebar from '../../components/Sidebar.vue'
  export default {
    name: 'Chat',
    components: {
      Sidebar
    },
    data: () => ({
        sessions:[],
        selectedSession: null,
        sessionMessages: [],
        message:null,
        isConnected: false,
        socketMessage: ''
    }),


      sockets: {
        connect() {
          // Fired when the socket connects.
          this.isConnected = true;
        },

        disconnect() {
          this.isConnected = false;
        },

        // Fired when the server sends something on the "messageChannel" channel.
        chatMessage(data) {
          this.socketMessage = data
          console.log("Fired!");
          this.getMessages();
        }
      },

    
    methods: {
        getSessions(){
          this.$store.dispatch("GET_SESSIONS").then(result => {
            this.sessions = result.data.sessions;
          }).catch(error => {
            console.log("Error loading sessions: "+error.response.data.message);
          });
        },

        sendMessage(){
            this.$store.dispatch("SEND_MESSAGE", {
                sessionId: this.selectedSession,
                content: this.message
            }).then(result => {

                var element = this.$refs["chatWrapperBox"];
                element.scrollTop = element.scrollHeight;

                this.$socket.emit('pingServer', 'PING!');
                this.$socket.emit('chatMessage', 'fffff', 'HHhhhhhhhhhhhhhhhhhhh');

                this.message = null;
                console.log(result);
                this.getMessages();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        getMessages(){

          console.log("XXXXXXXXXXXXXX");

            this.$store.dispatch("GET_MESSAGES", this.selectedSession).then(result => {
                console.log(result.data.data.messages);
                this.sessionMessages = result.data.data.messages;
            }).catch(error => {
                console.log(error);
            });
        }
    },

     beforeMount(){
        
        this.selectedSession = this.$route.params.id;
        this.getSessions();
     },

     mounted(){
        this.selectedSession = this.$route.params.id;
        this.getMessages();

        var element = this.$refs["chatWrapperBox"];
        element.scrollTop = element.scrollHeight;
     },

     created: function() {
        this.selectedSession = this.$route.params.id;
        this.getMessages();
     }
  }
</script>