import os

def generate_switch_case(image_name):
    return "    case '{}':\n      return require('./assets/rewards/{}.png');".format(image_name, image_name)

def generate_js_file():
    images = [f for f in os.listdir() if f.endswith('.png')]

    with open('switch_case.js', 'w') as f:
        f.write("function getImage(imageName) {\n  switch (imageName) {\n")
        for image in images:
            image_name = image.split('.')[0]
            f.write(generate_switch_case(image_name))
            f.write('\n')
        f.write("    default:\n      return null;\n  }\n}\n")

if __name__ == '__main__':
    generate_js_file()
