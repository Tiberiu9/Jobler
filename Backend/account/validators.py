import os


def validate_file_extension(name):
    valid_extensions = {'.pdf'}
    _, ext = os.path.splitext(name)
    return ext.lower() in valid_extensions


# def validate_file_extension(name):
#     is_valid = True
#     ext = os.path.splitext(name)[1]  # [0] returns path+filename [1] returns extension
#     valid_extensions = ['.pdf']
#
#     if not ext.lower() in valid_extensions:
#         is_valid = False
#
#     return is_valid
