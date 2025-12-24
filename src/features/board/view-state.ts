import { useState } from "react";

type AddStickerViewState = {
  type: "add-sticker";
};

type IdleViewState = {
  type: "idle";
};

type ViewState = AddStickerViewState | IdleViewState;

export const useBoardViewState = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: "idle" });

  const goToIdle = () => {
    setViewState({ type: "idle" });
  };

  const goToAddSticker = () => {
    setViewState({ type: "add-sticker" });
  };

  return { viewState, goToAddSticker, goToIdle };
};
