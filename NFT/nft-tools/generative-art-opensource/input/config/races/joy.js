module.exports = ({ dir, width, height }) => ({
  name: "Joy",
  layers: [
     {
          name: "Head",
          elements: [
              {
              id: 0,
              name: 'Head-1',
              path: `${dir}/1-Head/Head1.png`,
              weight: 100,
              }
          ],
          position: { x: 0, y: 0 },
          size: { width: width, height: height },
      },
      {
          name: "Eyes",
          elements: [
            {
              id: 0,
              name: 'Eyes-1',
              path: `${dir}/2-Eyes/Eyes1.png`,
              weight: 70,
            },
            {
              id: 1,
              name: 'Eyes-2',
              path: `${dir}/2-Eyes/Eyes2.png`,
              weight: 20,
            },
            {
              id: 2,
              name: 'Eyes-4',
              path: `${dir}/2-Eyes/Eyes4.png`,
              weight: 10,
            },
          ],
          position: { x: 0, y: 0 },
          size: { width: width, height: height },
      },
      {
          name: "Nose",
          elements: [
            {
              id: 0,
              name: 'Nose-1',
              path: `${dir}/3-Nose/Nose1.png`,
              weight: 35,
            },
            {
              id: 1,
              name: 'Nose-2',
              path: `${dir}/3-Nose/Nose2.png`,
              weight: 25,
            },
            {
              id: 2,
              name: 'Nose-3',
              path: `${dir}/3-Nose/Nose3.png`,
              weight: 15,
            },
            {
              id: 3,
              name: 'Nose-4',
              path: `${dir}/3-Nose/Nose4.png`,
              weight: 13,
            },
            {
              id: 4,
              name: 'Nose-5',
              path: `${dir}/3-Nose/Nose5.png`,
              weight: 12,
            },
            {
              id: 5,
              name: 'Nose-6',
              path: `${dir}/3-Nose/Nose6.png`,
              weight: 10,
            },
          ],
          position: { x: 0, y: 0 },
          size: { width: width, height: height },
      },
      {
          name: "Mouth",
          elements: [
            {
              id: 0,
              name: 'Mouth-2',
              path: `${dir}/4-Mouth/Mouth2.png`,
              weight: 70,
            },
            {
              id: 1,
              name: 'Mouth-3',
              path: `${dir}/4-Mouth/Mouth3.png`,
              weight: 20,
            },
            {
              id: 2,
              name: 'Mouth-4',
              path: `${dir}/4-Mouth/Mouth4.png`,
              weight: 10,
            },
          ],
          position: { x: 0, y: 0 },
          size: { width: width, height: height },
      },
  ],
});
