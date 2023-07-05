<script lang="ts">
  import {
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
  } from "sveltestrap";
  import type { Data } from "./lib/types";

  let chipid: number = null;
  let name: string = "";
  let location: string = "";

  let responseData: Data = {
    success: false,
    error: "",
    sensor: {
      chipid: null,
      name: "",
      location: "",
    },
  };

  //submit form
  async function handleSubmit(e: Event) {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:666/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chipid, name, location }),
    });
    const data = await res.json();
    responseData = data;
    if (data.success) {
      document.querySelector("form").reset();
    }
  }
</script>

<main>
  <Container>
    <h1>Dodaj nowy czujnik</h1>
    <hr />
    <Form on:submit={handleSubmit}>
      <FormGroup>
        <Label for="chipid">Chip ID</Label>
        <Input
          type="text"
          name="chipid"
          id="chipid"
          bind:value={chipid}
          required
          autofocus
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">Nazwa</Label>
        <Input type="text" name="name" id="name" bind:value={name} required />
      </FormGroup>
      <FormGroup>
        <Label for="lokacja">Lokacja</Label>
        <Input
          type="text"
          name="lokacja"
          id="lokacja"
          bind:value={location}
          required
        />
      </FormGroup>
      <Button color="primary">Dodaj</Button>
    </Form>
    <!-- if responseData  -->
    {#if responseData.success}
      <hr />
      <div class="alert alert-success" role="alert">
        Dodano czujnik {responseData.sensor.chipid}
      </div>
    {/if}
    {#if responseData.error}
      <hr />
      <div class="alert alert-danger" role="alert">
        {responseData.error}
      </div>
    {/if}
  </Container>
</main>

<style>
</style>
