export type KboTeam = {
  id: string;
  name: string;
  color: string;
  stadium: string;
};

export const KBO_TEAMS: KboTeam[] = [
  { id: "lg", name: "LG", color: "#C30452", stadium: "잠실야구장" },
  { id: "doosan", name: "두산", color: "#131230", stadium: "잠실야구장" },
  { id: "ssg", name: "SSG", color: "#CE0E2D", stadium: "문학야구장" },
  { id: "kt", name: "KT", color: "#000000", stadium: "수원KT위즈파크" },
  { id: "nc", name: "NC", color: "#315288", stadium: "창원NC파크" },
  { id: "kia", name: "KIA", color: "#EA0029", stadium: "광주기아챔피언스필드" },
  { id: "samsung", name: "삼성", color: "#074CA1", stadium: "대구삼성라이온즈파크" },
  { id: "lotte", name: "LOTTE", color: "#041E42", stadium: "사직야구장" },
  { id: "hanwha", name: "한화", color: "#FF6600", stadium: "대전한화생명볼파크" },
  { id: "kiwoom", name: "키움", color: "#570514", stadium: "고척스카이돔" },
];

export function getTeamByName(name: string): KboTeam | undefined {
  return KBO_TEAMS.find((team) => team.name === name);
}

export function getOpponentTeams(teamName: string): KboTeam[] {
  return KBO_TEAMS.filter((team) => team.name !== teamName);
}
