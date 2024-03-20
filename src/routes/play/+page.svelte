<script lang="ts">
  import BSide from "../../lib/runes/components/BSide/BSide.svelte";
  import Tablet from "../../lib/runes/components/Tablet/Tablet.svelte";
  import Tabula from "../../lib/runes/components/Tabula.svelte";
</script>

<Tabula>
  <Tablet slot="a-side"></Tablet>
  <BSide slot="b-side"></BSide>
</Tabula>
