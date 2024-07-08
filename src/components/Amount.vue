<template>
  <div class="flex justify-between p-1">
    <dt class="font-bold">
      <slot name="label" />
    </dt>
    <dd>
      <slot></slot>
    </dd>
  </div>
</template>
