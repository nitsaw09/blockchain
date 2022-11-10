<template>
  <div id="footer" class="bg-dark text-white">
    <b-container>
      <b-row>
        <b-col offset-md="3" md="6">
          <div>
            Made with
            <b-icon
              icon="heart-fill"
              variant="info"
              scale="1.2"
              animation="throb"
            ></b-icon>
            by Nitesh
          </div>
        </b-col>
        <b-col md="3">
          <ul class="social-icon">
            <li>
              <a href="#" v-b-tooltip.top title="Facebook">
                <b-icon icon="facebook" scale="1.5"></b-icon>
              </a>
            </li>
            <li>
              <a href="#" v-b-tooltip.top title="Linkedin">
                <b-icon icon="linkedin" scale="1.5"></b-icon>
              </a>
            </li>
            <li>
              <a href="#" v-b-tooltip.top title="Github">
                <b-icon icon="github" scale="1.5"></b-icon>
              </a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {}
};
</script>

<style scoped>
#footer {
  margin-top: auto;
  width: 100%;
  padding: 15px;
}

#footer .icon {
  font-size: 1.5rem;
}

#footer .social-icon li {
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
