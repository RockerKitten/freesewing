import { calculateReduction } from "./shared";

export default part => {
  // prettier-ignore
  let {store, measurements, utils, sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options} = part.shorthand();

  for (let id of Object.keys(part.paths)) delete part.paths[id];

  // Cut off at yoke
  points.cbYoke = new Point(0, points.armholePitch.y);

  // Paths
  paths.saBase = new Path()
    .move(points.cbYoke)
    .line(points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck);
  if (options.splitYoke === "yes")
    paths.saBase = paths.saBase.line(points.cbYoke).close();
  paths.seam = paths.saBase.clone();
  paths.saBase.render = false;
  paths.seam = paths.seam.close().attr("class", "fabric");

  // Complete pattern?
  if (sa) {
    delete snippets.armholePitchNotch;
    points.title = new Point(points.neck.x, points.cbYoke.y / 3);
    macro("title", { at: points.title, nr: 4, title: "yoke", scale: 0.8 });
    points.logo = points.title.shift(-90, 50);
    snippets.logo = new Snippet("logo", points.logo);
    snippets.logo.attr("data-scale", 0.8);
    if (options.splitYoke === "yes") {
      points.grainlineFrom = points.cbYoke.shift(0, 20);
      points.grainlineTo = points.cbNeck.shift(0, 20);
      macro("grainline", {
        from: points.grainlineFrom,
        to: points.grainlineTo
      });
    } else {
      macro("cutonfold", {
        from: points.cbNeck,
        to: points.cbYoke,
        grainline: true
      });
    }

    macro("sprinkle", {
      snippet: "notch",
      on: ["neck", "shoulder"]
    });

    if (sa) {
      paths.sa = paths.saBase.offset(sa).attr("class", "fabric sa");
      if (options.splitYoke === "no") {
        paths.sa = paths.sa
          .line(points.cbNeck)
          .move(points.cbYoke)
          .line(paths.sa.start());
      }
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
