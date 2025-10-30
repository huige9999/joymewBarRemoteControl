export default {
  data() {
    return {
      initialViewportHeight: 0,
    };
  },
  mounted() {
    this.initKeyboardDetection();
  },
  beforeDestroy() {
    this.cleanupKeyboardDetection();
  },
  methods: {
    initKeyboardDetection() {
      this.initialViewportHeight = window.innerHeight;

      // Use Visual Viewport API if available (modern browsers), otherwise fallback to resize
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', this.handleViewportChange);
      } else {
        window.addEventListener('resize', this.handleViewportChange);
      }
    },
    cleanupKeyboardDetection() {
      // Clean up event listeners
      window.removeEventListener('resize', this.handleViewportChange);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', this.handleViewportChange);
      }

      // Ensure keyboard state is reset when component is destroyed
      this.$store.commit('menu/setKeyboardVisible', false);
    },
    handleViewportChange() {
      let heightDifference;

      // Use Visual Viewport API if available, otherwise use window height
      if (window.visualViewport) {
        heightDifference = this.initialViewportHeight - window.visualViewport.height;
      } else {
        const currentHeight = window.innerHeight;
        heightDifference = this.initialViewportHeight - currentHeight;
      }

      // If height decreased by more than 150px, keyboard is likely visible
      const isKeyboardVisible = heightDifference > 150;
      this.$store.commit('menu/setKeyboardVisible', isKeyboardVisible);
    },
  },
};
