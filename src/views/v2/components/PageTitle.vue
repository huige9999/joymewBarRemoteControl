<template>
    <div class="page-title">
        {{ pageTitle }}
    </div>
  </template>

<script>

export default {
  name: 'pageWithTitle',
  props: {
    pageTitle: {
      type: String,
      default: '',
    },
  },
};
</script>

  <style scoped>
 .page-title{
    color: #fff;
    font-size: 34px;
    font-weight: 500;
    padding-top: 37px;
    text-align: center;
 }
  </style>
