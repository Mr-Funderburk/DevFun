/* ==========================================================================
   Prism.js Extension: GameMaker Language (GML)
   DevFun custom grammar definition for GameMaker Studio 2 / LTS
   ========================================================================== */

(function (Prism) {
  if (!Prism || !Prism.languages) return;

  Prism.languages.gml = {
    'comment': [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    'string': {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"[^"]*"/,
      greedy: true
    },
    'gml-constant': /\b(?:c_white|c_black|c_red|c_blue|c_green|c_yellow|c_aqua|c_orange|c_purple|c_dkgray|c_ltgray|c_gray|c_lime|c_maroon|c_navy|c_olive|c_silver|c_teal|c_fuchsia|vk_left|vk_right|vk_up|vk_down|vk_space|vk_enter|vk_shift|vk_control|vk_escape|vk_backspace|vk_tab|vk_alt|vk_anykey|vk_nokey|mb_left|mb_right|mb_middle|mb_any|mb_none|all|noone|other|self|global|true|false|undefined|NaN|infinity)\b/,
    'gml-builtin': /\b(?:instance_create_layer|instance_create_depth|instance_destroy|instance_exists|instance_number|instance_find|instance_nearest|instance_furthest|place_meeting|place_empty|position_meeting|position_empty|keyboard_check|keyboard_check_pressed|keyboard_check_released|mouse_check_button|mouse_check_button_pressed|draw_self|draw_sprite|draw_sprite_ext|draw_text|draw_text_transformed|draw_set_color|draw_set_font|draw_set_halign|draw_set_valign|draw_line|draw_rectangle|draw_circle|room_goto|room_goto_next|room_goto_previous|room_restart|audio_play_sound|audio_stop_sound|audio_pause_sound|audio_resume_sound|audio_is_playing|alarm_set|alarm_get|show_debug_message|show_message|point_distance|point_direction|lengthdir_x|lengthdir_y|clamp|lerp|min|max|mean|median|choose|irandom|irandom_range|random|random_range|round|floor|ceil|abs|sign|sqr|sqrt|power|exp|ln|log2|log10|sin|cos|tan|arcsin|arccos|arctan|dsin|dcos|dtan|darcsin|darccos|darctan|degtorad|radtodeg|array_length|array_push|array_pop|array_insert|array_delete|array_create|struct_get|struct_set|struct_exists|ds_list_create|ds_list_destroy|ds_list_add|ds_list_find_value|ds_map_create|ds_grid_create|part_system_create|part_type_create|part_emitter_create|camera_create|camera_set_view_pos|camera_set_view_size|surface_create|surface_free|surface_set_target|surface_reset_target|event_inherited|event_perform)\b/,
    'gml-variable': /\b(?:x|y|xprevious|yprevious|xstart|ystart|hspeed|vspeed|speed|direction|friction|gravity|gravity_direction|sprite_index|sprite_width|sprite_height|sprite_xoffset|sprite_yoffset|image_index|image_number|image_speed|image_xscale|image_yscale|image_angle|image_alpha|image_blend|mask_index|bbox_left|bbox_right|bbox_top|bbox_bottom|depth|layer|visible|solid|persistent|alarm|room|room_width|room_height|room_speed|score|lives|health|mouse_x|mouse_y|fps|fps_real|delta_time|current_time|current_year|current_month|current_day|current_weekday|current_hour|current_minute|current_second)\b/,
    'keyword': /\b(?:var|globalvar|function|static|return|if|then|else|while|do|until|for|repeat|switch|case|break|default|continue|with|exit|enum|constructor|new|delete|try|catch|finally|throw)\b/,
    'boolean': /\b(?:true|false)\b/,
    'number': /\b0x[\da-fA-F]+\b|\b0b[01]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
    'operator': /--|\+\+|&&|\|\||<<|>>|<=|>=|==|!=|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|\+\+|--|[?:+\-*\/%&|^~<>=!]/,
    'punctuation': /[{}[\];(),.:]/
  };

  Prism.languages.gamemaker = Prism.languages.gml;
})(typeof window !== "undefined" ? window.Prism : (typeof Prism !== "undefined" ? Prism : {}));
