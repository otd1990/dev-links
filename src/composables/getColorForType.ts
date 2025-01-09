const getColorForType = (type: string): string => {
  switch (type) {
    case "Linkedin":
      return "#2e68ff";
    case "YouTube":
      return "#ee3939";
    case "GitHub":
    case "GitLab":
      return "#1a1a1a";
    case "CodePen":
      return "#141416";
    case "CodeWars":
      return "#BC3F40";
    case "Facebook":
      return "#3C5897";
    case "Free Code Camp":
      return "#090B23";
    case "Frontend Mentor":
      return "#3E54A3";
    case "StackOverflow":
      return "#F48024";
    case "Twitch":
      return "#451093";
    case "Twitter":
      return "#000000";
    default:
      return "#AAA"; // Default color if type doesn't match
  }
};

export default getColorForType;
