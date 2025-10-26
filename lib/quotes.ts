export const motivationalQuotes = [
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Success is the sum of small efforts repeated daily.",
  "Today's accomplishments were yesterday's impossibilities.",
  "Your only limit is you.",
  "Dream it. Wish it. Do it.",
  "Small progress is still progress.",
  "One task at a time. You got this.",
  "Make each day your masterpiece.",
  "The future depends on what you do today.",
  "Don't watch the clock; do what it does. Keep going.",
  "Believe you can and you're halfway there.",
  "Action is the foundational key to all success.",
  "You don't have to be great to start, but you have to start to be great.",
  "The only way to do great work is to love what you do.",
];

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}
