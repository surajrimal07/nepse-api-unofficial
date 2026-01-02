export const nepseIndexes = [
	"Banking SubIndex",
	"Development Bank Ind.",
	"Finance Index",
	"Hotels And Tourism",
	"HydroPower Index",
	"Investment",
	"Life Insurance",
	"Manufacturing And Pr.",
	"Microfinance Index",
	"Mutual Fund",
	"NEPSE Index",
	"Non Life Insurance",
	"Others Index",
	"Trading Index",
] as const;

export type IndexKey = typeof nepseIndexes[number];
