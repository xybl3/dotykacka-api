type Count = "value" | "piece";
type Weight =
  | "Value"
  | "Milligram"
  | "Decagram"
  | "Gram"
  | "Kilogram"
  | "Pound"
  | "Ounce"
  | "Quintal"
  | "Tonne";
type Length =
  | "Value"
  | "Millimeter"
  | "Centimeter"
  | "Meter"
  | "Kilometer"
  | "Inch"
  | "Mile";

type Area = "Value" | "SquareMeter" | "SquareFoot";

type Volume =
  | "Value"
  | "Milliliter"
  | "Deciliter"
  | "Centiliter"
  | "Liter"
  | "UsGallon"
  | "UkGallon"
  | "Hectoliter"
  | "CubicMeter"
  | "CubicFoot";

type Time = "Value" | "Second" | "Minute" | "Hour" | "Day";

type Point = "Value" | "Points";

type Unit = Count | Weight | Length | Area | Volume | Time | Point;

export { Count, Weight, Length, Area, Volume, Time, Point, Unit };
