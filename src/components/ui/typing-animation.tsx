import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  children?: string;
  words?: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
}

export function TypingAnimation({
  children,
  words,
  className,
  typeSpeed = 100,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const started = useRef(false);

  const wordsToAnimate = useMemo(
    () => words || (children ? [children] : []),
    [words, children],
  );
  const hasMultipleWords = wordsToAnimate.length > 1;
  const deletingSpeed = deleteSpeed || typeSpeed / 2;

  useEffect(() => {
    if (wordsToAnimate.length === 0) return;

    const timeoutDelay =
      delay > 0 && !started.current
        ? delay
        : phase === "typing"
          ? typeSpeed
          : phase === "deleting"
            ? deletingSpeed
            : pauseDelay;

    const timeout = setTimeout(() => {
      started.current = true;
      const currentWord = wordsToAnimate[currentWordIndex] || "";
      const graphemes = Array.from(currentWord);

      switch (phase) {
        case "typing":
          if (currentCharIndex < graphemes.length) {
            setDisplayedText(graphemes.slice(0, currentCharIndex + 1).join(""));
            setCurrentCharIndex(currentCharIndex + 1);
          } else if (hasMultipleWords || loop) {
            const isLastWord = currentWordIndex === wordsToAnimate.length - 1;
            if (!isLastWord || loop) {
              setPhase("pause");
            }
          }
          break;

        case "pause":
          setPhase("deleting");
          break;

        case "deleting":
          if (currentCharIndex > 0) {
            setDisplayedText(graphemes.slice(0, currentCharIndex - 1).join(""));
            setCurrentCharIndex(currentCharIndex - 1);
          } else {
            const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length;
            setCurrentWordIndex(nextIndex);
            setPhase("typing");
          }
          break;
      }
    }, timeoutDelay);

    return () => clearTimeout(timeout);
  }, [
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typeSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
  ]);

  const currentWordGraphemes = Array.from(wordsToAnimate[currentWordIndex] || "");
  const isComplete =
    !loop &&
    currentWordIndex === wordsToAnimate.length - 1 &&
    currentCharIndex >= currentWordGraphemes.length &&
    phase !== "deleting";

  const shouldShowCursor =
    showCursor &&
    !isComplete &&
    (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length);

  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "\u258C";
      case "underscore":
        return "_";
      case "line":
      default:
        return "|";
    }
  };

  return (
    <span className={cn("leading-[5rem] tracking-[-0.02em]", className)}>
      {displayedText}
      {shouldShowCursor && (
        <span className={cn("inline-block", blinkCursor && "animate-blink-cursor")}>
          {getCursorChar()}
        </span>
      )}
    </span>
  );
}
