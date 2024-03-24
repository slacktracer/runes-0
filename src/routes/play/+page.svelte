<script lang="ts">
  import ASide from "../../lib/runes/components/ASide/ASide.svelte";
  import BSide from "../../lib/runes/components/BSide/BSide.svelte";
  import Tabula from "../../lib/runes/components/Tabula.svelte";
</script>

<Tabula>
  <ASide slot="a-side"></ASide>
  <BSide slot="b-side"></BSide>
</Tabula>
