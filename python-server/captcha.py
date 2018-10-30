from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from io import BytesIO

import random

class ValidCodeImg:
    def __init__(self,
                 width=160,
                 height=30,
                 code_count=5,
                 font_size=32,
                 point_count=20,
                 line_count=3,
                 img_format='png'):
        '''
        可以生成一个经过降噪后的随机验证码的图片
        :param width: 图片宽度 单位px
        :param height: 图片高度 单位px
        :param code_count: 验证码个数
        :param font_size: 字体大小
        :param point_count: 噪点个数
        :param line_count: 划线个数
        :param img_format: 图片格式
        :return 生成的图片的bytes类型的data
        '''
        self.width = width
        self.height = height
        self.code_count = code_count
        self.font_size = font_size
        self.point_count = point_count
        self.line_count = line_count
        self.img_format = img_format

    @staticmethod
    def getRandomColor():
        '''获取一个随机颜色(r,g,b)格式的'''
        c1 = random.randint(0, 255)
        c2 = random.randint(0, 255)
        c3 = random.randint(0, 255)
        return (c1, c2, c3)

    @staticmethod
    def getRandomStr():
        '''获取一个随机字符串，每个字符的颜色也是随机的'''
        random_num = str(random.randint(0, 9))
        random_low_alpha = chr(random.randint(97, 122))
        random_upper_alpha = chr(random.randint(65, 90))
        random_char = random.choice(
            [random_num, random_low_alpha, random_upper_alpha])
        return random_char

    def getValidCodeImg(self):

        # 获取一个Image对象，参数分别是RGB模式。宽150，高30，随机颜色
        image = Image.new('RGB', (self.width, self.height), (255, 255, 255))

        # 获取一个画笔对象，将图片对象传过去
        draw = ImageDraw.Draw(image)

        # 获取一个font字体对象参数是ttf的字体文件的目录，以及字体的大小
        font = ImageFont.truetype("Sans-Serif.ttf", size=self.font_size)

        temp = []
        for i in range(self.code_count):
            # 循环5次，获取5个随机字符串
            random_char = self.getRandomStr()

            # 在图片上一次写入得到的随机字符串,参数是：定位，字符串，颜色，字体
            draw.text((10 + i * 30, -2),
                      random_char,
                      self.getRandomColor(),
                      font=font)

            # 保存随机字符，以供验证用户输入的验证码是否正确时使用
            temp.append(random_char)
        valid_str = "".join(temp)

        # 噪点噪线
        # 划线
        for i in range(self.line_count):
            x1 = random.randint(0, self.width)
            x2 = random.randint(0, self.width)
            y1 = random.randint(0, self.height)
            y2 = random.randint(0, self.height)
            draw.line((x1, y1, x2, y2), fill=self.getRandomColor())

        # 画点
        for i in range(self.point_count):
            draw.point([
                random.randint(0, self.width),
                random.randint(0, self.height)
            ],
                       fill=self.getRandomColor())
            x = random.randint(0, self.width)
            y = random.randint(0, self.height)
            draw.arc((x, y, x + 4, y + 4), 0, 90, fill=self.getRandomColor())

        # 在内存生成图片
        f = BytesIO()
        image.save(f, self.img_format)
        data = f.getvalue()
        f.close()
        return data, valid_str
