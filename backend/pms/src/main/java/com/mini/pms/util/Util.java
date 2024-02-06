package com.mini.pms.util;


import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class Util {

    private static ModelMapper modelMapper = new ModelMapper();

    public static <T, E> List<E> mapList(List<T> list, Class<E> map) {
        return list.stream()
                .map(m -> modelMapper.map(m, map))
                .collect(Collectors.toList());
    }

    public static <T, E> E mapObj(T obj, Class<E> map) {
        return modelMapper.map(obj, map);
    }

}
