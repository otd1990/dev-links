<script setup lang="ts">
import { computed } from "vue";
import getIconPath from "../../composables/getIconPath";

interface IProps {
  links: any;
}

const props = withDefaults(defineProps<IProps>(), {
  links: [],
});

const linkCount = computed(() => {
  console.log("PROPS DOT LINKS ", props.links);
  return props.links.length;
});

const getColorForType = (type: string): string => {
  switch (type) {
    case "Linkedin":
      return "#2e68ff";
    case "YouTube":
      return "#ee3939";
    case "GitHub":
    case "GitLab":
      return "#1a1a1a";
    default:
      return "#AAA"; // Default color if type doesn't match
  }
};

const getColours = (links: Array<{ type: string }>): string[] => {
  return links.map((link) => getColorForType(link.type));
};

const buildIcon = computed(() => {
  const maxRects = 5;
  const yStart = 278;
  const yOffset = 65;

  const colors = getColours(props.links).concat(
    Array(maxRects - props.links.length).fill("#eee")
  );

  return Array.from({ length: maxRects }, (_, i) => {
    const yPosition = yStart + i * yOffset;
    const isActiveLink = i < linkCount.value;
    const color = isActiveLink ? colors[i % colors.length] : "#EEE";
    const textColor = isActiveLink ? "#FFF" : "";

    return `
      <g transform="translate(35, ${yPosition})">
        <rect width="237" height="44" fill="${color}" rx="8" />
        ${
          isActiveLink
            ? `
            <image x="10" y="13" href="${getIconPath(
              props.links[i]?.type.toLowerCase()
            )}" style="filter: brightness(0) saturate(100%) invert(100%);" />
            <text x="35" y="28" fill="${textColor}" font-size="14">
            ${props.links[i]?.type || ""}
            </text>
            `
            : ""
        }
      </g>
    `;
  }).join("");
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="308"
    height="632"
    fill="none"
    viewBox="0 0 308 632"
  >
    <path
      stroke="#737373"
      d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
    />
    <path
      fill="#fff"
      stroke="#737373"
      d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
    />
    <circle cx="153.5" cy="112" r="48" fill="#EEE" />
    <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
    <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
    <!-- Grey Skeleton -->
    <g v-html="buildIcon"></g>
  </svg>
</template>
