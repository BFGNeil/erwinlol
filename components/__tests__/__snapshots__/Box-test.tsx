import React from "react";
import { render } from "@testing-library/react-native";
import Box from "../../box";
import * as SecureStore from "expo-secure-store";

jest.mock("expo-secure-store");

describe("Box Component", () => {
  const mockBoxProps = {
    box_id: 1,
    rewards: 123.4567,
    guesses: 3,
    is_burned: false,
    opened_at: "2023-10-01T12:00:00Z",
    opener_wallet: "wallet123",
    spawned_at: "2023-09-01T12:00:00Z",
    state: "opened",
    state_str: "Opened",
  };

  beforeEach(() => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue("wallet123");
  });

  it("renders correctly with given props", async () => {
    const { findByText } = render(<Box {...mockBoxProps} />);

    expect(await findByText("1")).toBeTruthy();
    expect(await findByText("Opened At: 10/1/2023, 12:00:00 PM")).toBeTruthy();
    expect(await findByText("State: Opened - By You")).toBeTruthy();
    expect(await findByText("Rewards: 123.4567")).toBeTruthy();
    expect(await findByText("Guesses: 3")).toBeTruthy();
  });

  it('displays "Burned" state correctly', async () => {
    const burnedProps = { ...mockBoxProps, is_burned: true };
    const { findByText } = render(<Box {...burnedProps} />);

    expect(await findByText("State: Burned - By You")).toBeTruthy();
  });

  it('displays "By You" only if opener_wallet matches walletId', async () => {
    const differentWalletProps = {
      ...mockBoxProps,
      opener_wallet: "wallet456",
    };
    const { findByText } = render(<Box {...differentWalletProps} />);

    expect(await findByText("State: Opened")).toBeTruthy();
  });
});
