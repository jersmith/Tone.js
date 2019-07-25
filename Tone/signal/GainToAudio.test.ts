import { BasicTests } from "test/helper/Basic";
import { connectFrom, connectTo } from "test/helper/Connect";
import { ConstantOutput } from "test/helper/ConstantOutput";
import { Zero } from "Tone/signal/Zero";
import { GainToAudio } from "./GainToAudio";
import { Signal } from "./Signal";

describe("GainToAudio", () => {

	BasicTests(GainToAudio);

	context("Gain To Audio", () => {

		it("handles input and output connections", () => {
			const g2a = new GainToAudio();
			connectFrom().connect(g2a);
			g2a.connect(connectTo());
			g2a.dispose();
		});

		it("outputs 0 for an input value of 0.5", () => {
			return ConstantOutput(() => {
				const sig = new Signal(0.5);
				const g2a = new GainToAudio();
				sig.connect(g2a);
				g2a.toMaster();
			}, 0);
		});

		it("outputs 1 for an input value of 1", () => {
			return ConstantOutput(() => {
				const sig = new Signal(1);
				const g2a = new GainToAudio();
				sig.connect(g2a);
				g2a.toMaster();
			}, 1);
		});

		it("outputs -1 for an input value of 0", () => {
			return ConstantOutput(() => {
				const sig = new Zero();
				const g2a = new GainToAudio();
				sig.connect(g2a);
				g2a.toMaster();
			}, -1);
		});
	});
});
