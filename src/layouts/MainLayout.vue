<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green-10">
      <q-toolbar>
        <q-toolbar-title>
          ЦУР Пульт Управления
        </q-toolbar-title>
        <div id="actions"></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
